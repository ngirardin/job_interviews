# Spendesk Frontend test

## Description

This is the front-end test for Spendesk.

Checkout a live version at https://clever-albattani-d57df5.netlify.com.

This is a simple demo app that let you import a CSV file of all your users.

The CSV file fields must be `firstName,lastName,gender,email,phone`.

If the file is valid, on hitting "Save", a POST request is made to `/api/invite` with the users serialized in JSON as the body.

## Structure

- `components`: holds the React components,
- `model`: holds the model that represents the user and how to validate it,
- `parser`: holds the parser that parses the csv files,
- `utils`: holds the gravatar utils that generates a gravatar url from an email address

## Commands

### How to install

Run `yarn`.

### How to run the development server

Run `yarn start`.

### How to run the tests

Run `yarn test`.

### How to deploy

The code is hosted on github and automatically deployed to Netlify at each push.
