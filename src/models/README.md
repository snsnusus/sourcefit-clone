# Data Modeling & Type Conventions

To maintain a scalable, type-safe, and highly maintainable codebase, we decouple our **User Interface (UI) state** from our **Database (DB) structures**.

Every entity in our system goes through a distinct lifecycle: from a user typing into a form, to an API request payload, to the raw database layer, and finally to the rich populated objects we display on screen.

To prevent naming collisions and keep type boundaries clear, we use a strict **Suffix-Based Naming Convention**.

---

## 🏷️ The Naming Blueprint

| Suffix                  | Purpose / Target                   | Description                                                                                                           | Example (Department)   |
| :---------------------- | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| **`FormValues`**        | **UI Form State & Inputs**         | Tailored for UI components. Holds full objects (e.g., for `Autocomplete`) and localized values.                       | `DepartmentFormValues` |
| **`Payload`**           | **API Write Operations**           | The exact schema expected by our `POST` / `PUT` endpoints. Flattened relationships (IDs instead of objects).          | `DepartmentPayload`    |
| **`Model`**             | **DB Row / Table Mirror**          | A 1:1 representation of the database table schema (including `id`, `created_at`, snake_case fields if applicable).    | `DepartmentModel`      |
| **`[Entity]`** _(None)_ | **Fetched Details with Relations** | The full, rich, populated entity returned by database queries with joins. Used for read-only displays and hydrations. | `Department`           |

---

## 📐 Structural Lifecycle Diagram

1. **Autocomplete/Selections** (Dropdown options, e.g., `UserOption[]`)
   └── ➔ Loaded into...
2. **FormValues (UI State)** (Holds full objects, e.g., `DepartmentFormValues`)
   ├── ➔ Mapped & flattened for writing to...
   │ └── **Payload (API Write)** (Uses IDs, e.g., `DepartmentPayload`) ➔ Saves to **Model (DB Row)**
   │
   └── ➔ Hydrated & populated on read from...
3. **[Entity] (UI View/Detail)** (Rich, joined details with IDs, e.g., `Department`)

---

## 💻 Concrete Example: `Department`

Here is how a single entity is modeled across its lifecycle:

```typescript
export type DepartmentContact = {
  userId: string;
  name: string;
  position: string;
  email: string;
  avatarUrl?: string;
};

// 1. FORM VALUES - What the React form state & UI inputs use
export type DepartmentFormValues = {
  name: string;
  slug: string;
  costCenterCode: string;
  description: string;
  status: string;
  coverImageUrl: string | null;
  responsibilities: Array<{ title: string; subtitle: string }>;

  // React needs full objects to display Autocomplete selections cleanly
  primaryContact: DepartmentContact | null;
  secondaryContact: DepartmentContact | null;
};

// 2. PAYLOAD - What we send POST/PUT to the API
export type DepartmentPayload = {
  name: string;
  slug: string;
  costCenterCode: string;
  description: string;
  status: string;
  coverImageUrl: string | null;
  responsibilities: Array<{ title: string; subtitle: string }>;

  // Flattened relations to strict IDs for database storage
  primaryContactId: string | null;
  secondaryContactId: string | null;
};

// 3. MODEL - The raw, flat DB row representation
export type DepartmentModel = {
  id: string;
  name: string;
  slug: string;
  cost_center_code: string;
  description: string;
  status: string;
  primary_contact_id: string | null;
  secondary_contact_id: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
};

// 4. [ENTITY] - The rich, populated details we display in the UI
export type Department = DepartmentFormValues & {
  id: string;
  teamMembers: DepartmentContact[];
};
```
