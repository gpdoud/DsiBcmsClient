# Boot Camp Management System

## Developers Process

This describes how developers should work on enhancements and bug fixes on BCMS.

### Repositories

There are two repos that together make up the BCMS.

[Front end (Angular) for BCMS.](https://github.com/gpdoud/DsiBcmsClient)
[Back end (C#) for BCMS.](https://github.com/gpdoud/DsiBcmsServer)

### Branches

In both repos, the `master` branch is the code running in production. Developers should NOT merge there work into the master branch. Instead, for development purposes, a `dev` branch was created from the `master` branch as an identical copy of master. Developers should create their own development branches from `dev`. That developer's branch should include where possible the initials of the developer and the issue number like this: `gd-log-db-#40` This is an example of a branch for Greg Doud that will address issue #40 which has to do with creating a log in the database. So to get started, the new branch would be created like this:

`git checkout master` // if not already in the master branch
`git checkout dev` // switch to the dev branch
`git checkout -b xx-yyyyy-#zz` // where xx is the developer initials, yyyyy is a short description of the work, and zz is the number of the issue being addressed.

All dev and testing work should be in the new branch. When ready and in the developer's branch, the developer should push their branch to GitHub after committing changes like this:

`git push origin xx-yyyyy-#zz` // respond `yes` to no upstream branch if it appears.

Next, go to GitHub and create a `Pull Request` to merge the new branch back into the `dev` branch. Notify Greg.

The Pull Request will be reviewed and either merged into dev or required changed will be documented in the Pull request. The developer will make those changes, push additional changes up to the new branch the the process repeats until merged into the `dev` branch.

Contact Greg if you have any questions.

## Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

