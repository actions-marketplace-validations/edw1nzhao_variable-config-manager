# Variable Config Manager Docker Action

Get config from an external environment variable repository and from a secret manager to be used in GitHub Actions flow. Envsubst will be used in replacing variables.

## Inputs

### `config-repo`

**Required** Repository that's going to be used for setting up your environment configuration.

## Outputs

### `time`

Time at which it was run.

## Example usage

uses: actions/variable-config-manager@v1
with:
  config-repo: "https://github.com/ezhao7/variable-config-manager.git"