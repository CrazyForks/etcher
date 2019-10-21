'use strict'

const { notarize } = require('electron-notarize')

/**
 *
 * @param {*} context - Object containint electron-builder context
 * @returns {Promise}
 *
 * @example
 * await notarize({
 *   // electron-builer context
 * })
 */
const notarizing = async (context) => {
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return Promise.resolve()
  }

  const appName = context.packager.appInfo.productFilename
  const appleId = 'accounts+apple@balena.io'

  return notarize({
    appBundleId: 'io.balena.etcher',
    appPath: `${appOutDir}/${appName}.app`,
    appleId,
    appleIdPassword: `@keychain:"Application Loader: ${appleId}`
  })
}

exports.default = notarizing
