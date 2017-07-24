#!/bin/bash

base_dir=$(dirname "${BASH_SOURCE[0]}")
cd "$base_dir"

rm -rf ~/.local/share/cinnamon/desklets/sharkle@lufinkey
cp -r sharkle@lufinkey ~/.local/share/cinnamon/desklets/sharkle@lufinkey
