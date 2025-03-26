const { Version } = require('release-please/build/src/version')

const PRERELEASE_PATTERN = /^(?<type>[a-z]+)(?<number>\d+)$/

class PrereleaseVersionUpdate {
  /**
     * Returns the new bumped version
     *
     * @param {Version} version The current version
     * @returns {Version} The bumped version
     */
  bump (version) {
    if (version.preRelease) {
      const match = version.preRelease.match(PRERELEASE_PATTERN)
      if (match === null || match === void 0 ? void 0 : match.groups) {
        const numberLength = match.groups.number.length
        const nextPrereleaseNumber = Number(match.groups.number) + 1
        const paddedNextPrereleaseNumber = `${nextPrereleaseNumber}`.padStart(numberLength, '0')
        const nextPrerelease = `${match.groups.type}${paddedNextPrereleaseNumber}`
        console.log(`Bumping prerelease version from ${version.preRelease} to ${nextPrerelease}`);
        return new Version(version.major, version.minor, version.patch, nextPrerelease, undefined)
      }
    }
    return new Version(version.major, version.minor, version.patch, version.preRelease, undefined)
  }
}

class OnlyMinorVersionUpdate {
  /**
     * Returns the new bumped version
     *
     * @param {Version} version The current version
     * @returns {Version} The bumped version
     */
  bump (version) {
    const nextMinor = version.preRelease ? version.minor : version.minor + 1
    return new Version(
      version.major,
      nextMinor,
      0,
      null,
      null
    )
  }
}

class OnlyPatchVersionUpdate {
  /**
     * Returns the new bumped version
     *
     * @param {Version} version The current version
     * @returns {Version} The bumped version
     */
  bump (version) {
    return new Version(
      version.major,
      version.minor,
      version.patch + 1,
      null,
      null
    )
  }
}

module.exports = {
  OnlyMinorVersionUpdate,
  OnlyPatchVersionUpdate,
  PrereleaseVersionUpdate
}
