import { module, bootstrap } from 'angular';

import "core-js";
import "babel-polyfill";

import appComponent from './app.component';
import routing from './app.routing';
import runBlock from './app.run';
import Core from './core/core.module';
import Shared from './shared/shared.module';
import Auth from './auth/auth.module';
import SnapMe from "./snap-me/snap-me.module"

const AppModule: string = module('app', [Core, Shared, Auth,SnapMe])
    .component('appComponent', appComponent)
    .config(routing)
    .run(runBlock)
    .name;

bootstrap(document, [AppModule]);

