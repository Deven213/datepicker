# Quick Date Navigator PCF Control

A custom Power Apps Component Framework (PCF) control designed to enhance the date selection experience in Dynamics 365 and Model-Driven Apps. This control replaces the standard date picker with a more powerful interface, offering a side-by-side view of a standard calendar and a "Quick Navigation" sidebar. This allows users to rapidly select dates using meaningful presets or custom intervals without manually clicking through months.

## 🚀 Features

### 📅 Quick Presets
Instantly select commonly used dates with a single click:
*   **Today**, **Yesterday**, **Tomorrow**
*   **Next Friday** (Useful for scheduling)
*   **End of Month** (Useful for closing dates)

### ⏩ Relative Navigation
Quickly jump forwards or backwards in time without losing context:
*   Previous/Next **7 Days**
*   Previous/Next **30 Days**
*   Previous/Next **2 Months**
*   Previous/Next **1 Year**

### 🔢 Custom Days Jump
Need to jump exactly 45 days ahead? The **Custom Jump** feature allows users to enter any number of days and instantly navigate backward (`Previous`) or forward (`Next`) by that amount.

### 🎨 Seamless UI
*   **Fluent UI Integration**: Built using Microsoft's Fluent UI components (Calendar, Callout, TextField) to ensure it looks and feels native to Dynamics 365.
*   **Non-Intrusive**: Appears as a standard read-only text field that opens a pop-up (Callout) when clicked, preserving screen real estate.

## 🛠️ Configuration

The control is designed to be a direct replacement for standard Date fields.

| Property | Type | Usage | Description |
| :--- | :--- | :--- | :--- |
| **Date Field** | DateOnly / DateAndTime | Bound | The specific date field this control will update. |
| **Timeline Range** | Whole Number | Input | *Internal configuration* (Default: 2). |

## 📦 Installation & Development

### Prerequisites
*   Node.js (LTS version recommended)
*   Microsoft Power Platform CLI (`pac`)

### Build Steps

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Build the Project**
    ```bash
    npm run build
    ```

3.  **Deploy to Environment**
    Push the control directly to your Dataverse environment (requires authentication):
    ```bash
    pac pcf push --publisher-prefix <your-prefix>
    ```
    *Replace `<your-prefix>` with your actual solution publisher prefix (e.g., `dev`, `new`, etc.).*

## 📝 Usage

1.  Open the **Power Apps Maker Portal**.
2.  Navigate to your **Solution** and edit the **Table Form**.
3.  Select the Date field you want to enhance.
4.  In the **Components** sidebar, click on **Get more components**.
5.  Search for and select **QuickDateNavigator**.
6.  Set the control to be visible for **Web**, **Tablet**, and **Phone**.
7.  **Save** and **Publish** your form.

## 🤝 Contributing

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
