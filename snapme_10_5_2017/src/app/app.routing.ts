import { ICompileProvider, ILogProvider } from "angular";
import {
	StateProvider,
	Ng1StateDeclaration,
	UrlService
} from "@uirouter/angularjs";

import { loadLazyState } from "./shared/util.service";

function configure(
	$compileProvider: ICompileProvider,
	$stateProvider: StateProvider,
	$urlServiceProvider: UrlService,
	$logProvider: ILogProvider
) {
	let isProductionBuild: boolean = __ENV !== "build";

	$compileProvider.debugInfoEnabled(!isProductionBuild);
	$logProvider.debugEnabled(!isProductionBuild);

	$urlServiceProvider.rules.initial("/snap-me");

	$urlServiceProvider.config.strictMode(false);

	$stateProvider
		.state(
		"auth",
		<Ng1StateDeclaration>{
			//lazyLoad: loadLazyState(() => import(/* webpackChunkName: "auth" */ './auth/auth.module')),
			component: "authComponent"
		}
		)
		.state(
		"snapMe",
		<Ng1StateDeclaration>{
			url: "/snap-me",
			component: "snapMe"
		}
		)
		.state(
		"home.**",
		<Ng1StateDeclaration>{
			url: "/home",
			lazyLoad: loadLazyState(() =>
				import(/* webpackChunkName: "home" */ "./home/home.module")
			)
		}
		);
}

configure.$inject = [
	"$compileProvider",
	"$stateProvider",
	"$urlServiceProvider",
	"$logProvider"
];

export default configure;
