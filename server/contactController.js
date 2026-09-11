const crypto = require('crypto');
const redisClient = require('./redisClient');

const pendingContactsCache = {};
const IS_PRODUCTION_SMS_ENABLED = false;
const SEMAPHORE_API_KEY = 'YOUR_API_KEY_HERE';

async function sendOtp(req, res) {
  const { name, email, phoneNumber } = req.body;

  if (!phoneNumber) {
    return res
      .status(400)
      .json({ success: false, error: 'Name and phone number are required.' });
  }

  const redisKey = `pending_contact:${phoneNumber}`;

  try {
    const existingOtpData = await redisClient.get(redisKey);

    if (existingOtpData) {
      const parsedData = JSON.parse(existingOtpData);

      console.log(
        `⚠️  [RATE LIMIT] Blocked request for ${phoneNumber}. Re-routing active timestamp.`
      );

      return res.status(429).json({
        success: false,
        error:
          'An active verification code is already running. Please check your messages or wait for the timer to expire.',
        expiresAt: parsedData.expiresAt, // 🚀 Pass back the existing timestamp so the UI countdown matches!
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const ttlSeconds = 180; // 3 minutes
    const expiresAt = Date.now() + ttlSeconds * 1000;

    const stagedPayload = {
      contactPayload: { name, email, phoneNumber },
      code: otpCode,
      expiresAt,
    };

    await redisClient.setEx(
      redisKey,
      ttlSeconds,
      JSON.stringify(stagedPayload)
    );

    if (!IS_PRODUCTION_SMS_ENABLED) {
      console.log(`\n==================================================`);
      console.log(`🔒 [VERIFICATION GUARD] Staging Contact: "${name}"`);
      console.log(`📱 Destination Number: ${phoneNumber}`);
      console.log(`🔑 Verification Security Code: [ ${otpCode} ]`);
      console.log(`⏱️  Expires At Timestamp: ${expiresAt}`);
      console.log(`==================================================\n`);

      return res.status(200).json({
        success: true,
        message:
          'Verification code staged. Please check the server console logs.',
        expiresAt,
      });
    }

    await fetch('https://api.semaphore.co/api/v4/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        apikey: SEMAPHORE_API_KEY,
        number: phoneNumber,
        message: `Verify your number to link this contact. Code: ${otpCode}`,
      }),
    });

    return res.status(200).json({
      success: true,
      message: 'Verification code dispatched.',
      expiresAt,
    });
  } catch (error) {
    console.error('Redis/SMS Staging Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process verification staging operations.',
    });
  }
}

/**
 * STEP 2: Checks the code and officially commits the data block to storage
 */
async function verifyOtp(req, res) {
  const { phoneNumber, userSubmittedCode } = req.body;

  const stagedRecord = pendingContactsCache[phoneNumber];

  // 1. Check if the registration attempt exists
  if (!stagedRecord) {
    return res.status(400).json({
      success: false,
      error: 'No pending registration found for this number or it has expired.',
    });
  }

  // 2. Validate Time To Live (TTL) expiration window
  if (Date.now() > stagedRecord.expiresAt) {
    delete pendingContactsCache[phoneNumber];
    return res
      .status(400)
      .json({ success: false, error: 'The verification code has expired.' });
  }

  // 3. Confirm matching string sequence
  if (stagedRecord.code !== userSubmittedCode) {
    return res
      .status(400)
      .json({ success: false, error: 'Incorrect verification code.' });
  }

  // --- AT THIS POINT, THE NUMBER IS OFFICIALLY VERIFIED ---
  // Extract the original data we locked in Step 1
  const verifiedContactData = stagedRecord.contactPayload;

  try {
    // 💾 DATABASE OPERATION GOES HERE!
    // Example: const newContact = await db.contacts.create(verifiedContactData);

    console.log(
      `💾 SUCCESS: Committed verified contact to DB:`,
      verifiedContactData
    );

    // Clear the cache record to protect against form re-submission attacks
    delete pendingContactsCache[phoneNumber];

    return res.status(201).json({
      success: true,
      message: 'Mobile number verified successfully! Contact saved to account.',
      data: verifiedContactData,
    });
  } catch (dbError) {
    console.error('❌ Database Write Fail:', dbError);
    return res
      .status(500)
      .json({ success: false, error: 'Database verification write failed.' });
  }
}

module.exports = { sendOtp, verifyOtp };
