#!/bin/bash

rm -rf build dist

./scripts/compile.sh

mkdir dist
electron-builder