# dotenv action

It reads the `.env` file from the root of this repo and provides environment variables to build steps.

## Build history

[![Run tests](https://github.com/falti/dotenv-action/actions/workflows/test.yml/badge.svg)](https://github.com/falti/dotenv-action/actions/workflows/test.yml)

## Inputs

### `path`

Override the path to the `.env` file. Default is `.env` in the repository root.

### `log-variables`

Log variables after reading from the `.env` file.

### `mask-variables`

Mask values after reading from the `.env` file.

### `ensure-exists`

Fail the action when `.env` file is not found at `path`. Default is `true`.

### `export-variables`

Export values as environment variables in addition to storing them in the output after reading from the `.env` file.

### `export-variables-prefix`

Prefix to prepend to each environment variable name when `export-variables` is set to true.

### `keys-case`

Transform keys cases to `lower`, `upper` or keep as it is with `bypass`.

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
