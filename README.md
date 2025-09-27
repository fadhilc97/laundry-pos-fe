# Laundry POS (Front-end)

### Getting started

#### Tech stacks

- Node v20 (LTS) or later

#### Local setup

- Clone this project to your local environment
- Duplicate the `.env.example` file to `.env`

  ```env
  # Environment = DEVELOPMENT | PRODUCTION
  NODE_ENV=

  # Back-end URL
  VITE_API_BASE_URL=
  ```

- Run the following commands:

  - Install dependencies

    ```bash
    # Using npx
    $ npm i

    # Using pnpm
    $ pnpm i
    ```

  - Run the project and open in local development server at http://localhost:5173

    ```bash
    # Using npx
    $ npm run dev

    # Using pnpm
    $ pnpm dev
    ```

#### Create owner account by Super Admin

- Login using your initial super admin account that already setup into the `.env` file

  ```env
  INITIAL_SUPER_ADMIN_EMAIL=your.super.admin.account@example.com
  INITIAL_SUPER_ADMIN_PASSWORD=your-super-admin-password
  ```

  <img src='./docs/screenshoots/01-create-owner-account/step-01.png' width="200" />

- In home page, there are quick access menu at top of the page. Click on User menu

  <img src='./docs/screenshoots/01-create-owner-account/step-02.png' width="200" />

- Currently the user data is empty, create new user as Owner by click on **Create New User** button. It will open the dialog.

  <img src='./docs/screenshoots/01-create-owner-account/step-03.png' width="200" />

- Input the **Name**, **Email** and **Password** field. Also check mark on **Owner** in Role field. Once completed, click on **Create** button to save and close the dialog

  <img src='./docs/screenshoots/01-create-owner-account/step-04.png' width="200" />

- The owner user already created. Use this account to login as owner user

  <img src='./docs/screenshoots/01-create-owner-account/step-05.png' width="200" />

- Click on **Others** menu at bottom of navigation menu. Then click on **Logout**

  <img src='./docs/screenshoots/01-create-owner-account/step-06.png' width="200" />

#### Laundry service initialization by Owner

- Login as owner using account that already created by super admin user.

  <img src='./docs/screenshoots/02-initialize-laundry-service/step-01.png' width="200" />

- After login, you will face on Create Laundry dialog, especially for owner user that never setup the new laundry service information. Complete the information, then scroll down to click on **Submit** button

  <img src='./docs/screenshoots/02-initialize-laundry-service/step-01.png' width="200" />

  <img src='./docs/screenshoots/02-initialize-laundry-service/step-02.png' width="200" />

#### Create staff account by Owner

- Still login as owner, find the Staff menu at top of the page

  <img src='./docs/screenshoots/03-create-staff-account/step-01.png' width="200" />

- Click on Create New User button, it will show the dialog. Fill in the information about new staff, like **Name**, **Email** and **Password**. In **Roles** field, the staff is already ticked by default. Then click on **Create** button to confirm. Use this account to login as staff and will get started to manage the transaction.

  <img src='./docs/screenshoots/03-create-staff-account/step-02.png' width="200" />

  <img src='./docs/screenshoots/03-create-staff-account/step-03.png' width="200" />

- Click on Others menu in navigation bar and click on Logout.

  <img src='./docs/screenshoots/03-create-staff-account/step-04.png' width="200" />

#### Make your first transaction

- Login as staff user that created before by owner.

  <img src='./docs/screenshoots/04-create-first-transaction/step-01.png' width="200" />

- At the top, click on **Orders** menu.

  <img src='./docs/screenshoots/04-create-first-transaction/step-02.png' width="200" />

- Click the **Create New Order** button.

  <img src='./docs/screenshoots/04-create-first-transaction/step-02a.png' width="200" />

- Select the existing customer, or click on "+" button to create new customer.

  <img src='./docs/screenshoots/04-create-first-transaction/step-03.png' width="200" />

- Complete the customer information. Once already finished, click on **Create** button.

  <img src='./docs/screenshoots/04-create-first-transaction/step-04.png' width="200" />

- Select again the customer that have created before.

  <img src='./docs/screenshoots/04-create-first-transaction/step-06.png' width="200" />

- Input the quantity of the items. The sub-total and the total will automatically calculated. Then, click on **Confirm and Continue**. It will be redirect to details of transaction.

  <img src='./docs/screenshoots/04-create-first-transaction/step-07.png' width="200" />

- In **Status** section, click on **Proceed** button to start the transaction process.

  <img src='./docs/screenshoots/04-create-first-transaction/step-08.png' width="200" />

- Once the process already finished, click on **Set to Finish** transaction.

  <img src='./docs/screenshoots/04-create-first-transaction/step-09.png' width="200" />

- Set the location where the laundry clothes will be putted in before customer pick-up. Click on **Confirm** button.

  <img src='./docs/screenshoots/04-create-first-transaction/step-10.png' width="200" />

  <img src='./docs/screenshoots/04-create-first-transaction/step-11.png' width="200" />

  <img src='./docs/screenshoots/04-create-first-transaction/step-12.png' width="200" />

- Scroll down to details and click on **Create Payment** button to make the payment by customer.

  <img src='./docs/screenshoots/04-create-first-transaction/step-13.png' width="200" />

- Choose the payment method and input the amount. Make sure the amount is enough with the unpaid amount, so it can be process to check out. Click on **Confirm** button.

  <img src='./docs/screenshoots/04-create-first-transaction/step-14.png' width="200" />

- Since the payment status is already paid, the order by customer can be process to pick up. Click on **Check Out** button. You can also download the transaction receipt, so it can be shareable with customer.

  <img src='./docs/screenshoots/04-create-first-transaction/step-15.png' width="200" />

  <img src='./docs/screenshoots/04-create-first-transaction/step-16.png' width="200" />
