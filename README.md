# dotenv action

It reads the `.env` file from the root of this repo and provides environment variables to build steps.

## Build history

[![Build history](https://buildstats.info/github/chart/falti/dotenv-action?branch=master)](https://github.com/falti/dotenv-action/actions)

## Inputs

### `path`

Override the path to the `.env` file. Default is `.env` in the repository root.

### `log-variables`

Log variables after reading from the `.env` file.

### `mask-variables`

Mask values after reading from the `.env` file.

## Outputs

### `generic`

Whatever is present in the `.env` file will be converted into an output variable.

E.g. you have the following `.env`:

    VERSION=1.0
    AUTHOR=Mickey Mouse

Then you will have outputs:

    {
        version: "1.0"
        author: "Mickey Mouse"
    }

## Example usage


    id: dotenv
    uses: ./.github/actions/dotenv-action

Then later you can refer to the alpine version like this
`${{ steps.dotenv.outputs.version }}`
