# SgaUiApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


===========================

Install node 12.1
install npm

git clone https://github.com/subhratchaudhary/sga-ui-repo.git
cd sga-ui-repo
git pull
git checkout -b implement-transaction-summary
git status
git pull

ng serve	


FAQ / Error
==>Error	
npm rebuild node-sass : incase the node module is lower than 12

node_module copied : in case he gets some error like @xtuc/long and MinMaxSizeWarning


==>Error
G:\git\spil\port-automation\angular-proj\sga-ui-repo>git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> implement-transaction-summary
	
	=============
Solution	
	git branch --set-upstream-to=origin/implement-transaction-summary implement-transaction-summary

	
=================================================
==>Error
	G:\git\spil\port-automation\angular-proj\sga-ui-repo>ng serve
Cannot find module '@xtuc/long'
Error: Cannot find module '@xtuc/long'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
    at Module.require (internal/modules/cjs/loader.js:692:17)
    at require (internal/modules/cjs/helpers.js:25:18)
    at Object.<anonymous> (G:\git\spil\port-automation\angular-proj\sga-ui-repo\node_modules\@webassemblyjs\wast-printer\lib\index.js:10:36)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
	

  
================================
  G:\git\spil\port-automation\angular-proj\sga-ui-repo>ng serve
Cannot find module './MinMaxSizeWarning'
Error: Cannot find module './MinMaxSizeWarning'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
    at Module.require (internal/modules/cjs/loader.js:692:17)
    at require (internal/modules/cjs/helpers.js:25:18)
    at Object.<anonymous> (G:\git\spil\port-automation\angular-proj\sga-ui-repo\node_modules\webpack\lib\optimize\SplitChunksPlugin.js:12:27)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)

===============================
	
ng -v

Angular CLI: 6.2.9
Node: 12.0
OS: win32 x64
Angular: 6.1.10
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.8.9
@angular-devkit/build-angular     0.13.10
@angular-devkit/build-optimizer   0.13.10
@angular-devkit/build-webpack     0.13.10
@angular-devkit/core              0.8.9
@angular-devkit/schematics        0.8.9
@angular/cli                      6.2.9
@ngtools/webpack                  7.3.10
@schematics/angular               0.8.9
@schematics/update                0.8.9
rxjs                              6.2.2
typescript                        2.9.2
webpack                           4.29.0
animation css

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>