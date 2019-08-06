dot="$(cd "$(dirname "$([ -L "$0" ] && $READLINK_CMD -f "$0" || echo "$0")")"; pwd)"
cd $dot/..

usage() {
  echo "Usage:"
  echo "  package.sh [package_name]"
}

require_file () {
  ls $1 >/dev/null 2>&1 || {
    echo >&2 "$1 not found at $(pwd). Aborting."
    exit 1
  }
}

require () {
  hash $1 2>/dev/null || {
    echo >&2 "$1 is not installed.  Aborting."
    exit 1
  }
}

require_arg () {
  test -n "$1" || {
    echo >&2 "$2 not provided. Aborting."
    usage
    exit 1
  }
  eval "$2=$1"
}

require_arg "$1" "package_name"

require fpm
require npm
require_file package.json
require_file ./bin/service.initd.sh

npm install
npm run setup

npm_version="$( npm version | grep -oP "'$package_name': '\K(.*)(?=')" )"
version="${VERSION:-${npm_version:-1.0}}"
build="${BUILD_NUMBER:-$RANDOM}"
rpmuser="divorce"

fpm -n "$package_name"                                      `# Name of the package` \
    -v "$version"                                           `# Version of the package` \
    --iteration "$build"                                    `# Ensure each build is unique` \
    -s dir                                                  `# Source type: directory` \
    -t rpm                                                  `# Target type: RPM` \
    --rpm-user "$rpmuser"                                   `# User who owns the files in the package. root unless we create a user` \
    --maintainer '<divorce-team@hmcts.net>'                 `# Email address for who is responsible` \
    --description 'Prototype for Applying for a divorce'    `# Set the description of the package` \
    --directories '/opt/divorce'                            `# Mark the target deployment folder as owned by the rpm-user` \
    --verbose                                               `# Log to stdout` \
    --exclude "**.rpm"                                      `# Exclude the build artefacts so we dont incept` \
    --exclude "*.git*"                                      `# Exclude git directories` \
    --exclude "*/test/**"                                   `# Exclude test directories` \
    --exclude "*/docs/**"                                   `# Exclude docs directories` \
    --exclude "*.travis.yml*"                               `# Exclude ansible files` \
    --exclude "*/bin/package.sh*"                           `# Exclude build script` \
    --exclude "*.md"                                        `# Exclude development artifacts` \
    --rpm-attr 755,root,root,:/etc/init.d/divorce-prototype `# Make the service definition executable` \
    --template-scripts                                      `# Enable erb templates` \
    --template-value name=$package_name                     `# Variable definition for after-install script` \
    --template-value username=$rpmuser                      `# Variable definition for after-install script` \
	--before-install ./bin/before-install.sh.erb            `# Create user before rpm installation` \
    --after-install ./bin/after-install.sh.erb              `# Run post-install script` \
    .=/opt/divorce/prototype                                `# Include the prototype folder in the package` \
    ./bin/service.initd.sh=/etc/init.d/divorce-prototype    `# Include the service definition`

