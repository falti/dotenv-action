
<p align="center">
  <a href="https://github.com/falti/dotenv-action/actions"><img alt="javscript-action status" src="https://github.com/falti/dotenv-action/workflows/units-test/badge.svg"></a>
</p>

# dotenv action

It reads the `.env` file from the root of this repo and provides environment variables to build steps.

## Inputs

### `path`

Override the path to the `.env` file. Default is `.env` in the repository root.

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
