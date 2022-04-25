#!/usr/bin/env bash
set +x -e

function debug_log() {
	if [ -n "$DEBUG" ] && [ "$DEBUG" != "false" ]; then
		MSG="${*}"
		echo "::debug file=${BASH_SOURCE[0]}:: ${MSG}"
	fi
}
function command_exists() {
	command -v "$1" >/dev/null 2>&1
}
function prefix_sudo() {
	if command_exists sudo && ! sudo -v >/dev/null 2>&1; then
		echo sudo
	fi
}
function installer() {
	SUDO=$(prefix_sudo)
	if command_exists yum; then
		$SUDO yum "$@"
	elif command_exists apt-get; then
		$SUDO apt-get -q update && $SUDO apt-get "$@"
	elif command_exists brew; then
		brew "$@"
	else
		debug_log "Can't install: " "$@"
		exit 1
	fi
}
function install_app() {
	# Usage: install_app <app name> [second app] [third app]
	# Is App installed?
	INSTALL_LIST=()
	for cmd in $@; do
		if ! command -v "${cmd}" >/dev/null 2>&1; then
			debug_log "Installing ${cmd}"
			INSTALL_LIST+=("${cmd}")
		else
			debug_log "${cmd} installed already"
		fi
	done
	if [ ${#INSTALL_LIST[@]} -gt 0 ]; then
		if [ "$(uname)" == "Darwin" ]; then
			installer install "${INSTALL_LIST[@]}"
		elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
			installer install -y -q "${INSTALL_LIST[@]}"
		fi
	fi
}

if [ "$(uname)" == "Darwin" ]; then
	command_exists pip3 || INSTALL_PIP=python3
	install_app jq $INSTALL_PIP
	command_exists yq || install_app python-yq
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	# Add python3 and pip3 to install list if they aren't there
	command_exists pip3 || INSTALL_PIP=python3-pip
	# install jq and pip3 if they aren't already installed
	install_app jq $INSTALL_PIP
	# install yq if its not already installed
	command_exists yq || pip3 install yq
fi
