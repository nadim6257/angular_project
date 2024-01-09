// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  laborModuleIp: `http://192.168.16.243:`,
  laborModulePort: `8091`,

  igmMisIp: `http://192.168.16.243:`,
  igmMisPort: `8093`,

  loginModuleIp: `http://192.168.16.243:`,
  loginModulePort: `8086`,

  frontApiIp: `http://192.168.16.243:`,
  frontApiPort: `8090`,

  userModuleIP: `http://192.168.16.50:`,
  userModulePort: `8081`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
