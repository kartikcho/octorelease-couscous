# Octo Release Draft Couscous

<p align="center">
  <img src="https://user-images.githubusercontent.com/48270786/78556023-d757be00-782b-11ea-9588-8ea2327df64b.png">
</p>

<br>

<div align="center">

![Build](https://github.com/kartik918/octorelease-couscous/workflows/Build/badge.svg) ![Test](https://github.com/kartik918/octorelease-couscous/workflows/Test/badge.svg?branch=maintenance-1)

</div>

<p align="center">
    <b>Automate drafting release notes process for your project.</b>
</p>

A GitHub action to automatically draft a GitHub release based on a newly created version tag.

The drafted release notes will include the commit messages between the created version tag and the one before it.

## What is a Couscous?

<i>Couscous originated as a Maghrebi dish of small steamed balls of crushed durum wheat semolina that is traditionally served with a stew spooned on top.</i>

I took this excerpt from [Wikipedia](https://en.wikipedia.org/wiki/Couscous) and didn't know it existed before naming the action. The idea for the name came from Github's randomly generated name suggestions on creating a repository so I just sticked with it.

## How a Release Draft Couscous is Prepared:

Example: Let's assume the history of your repository looks like this:

```
    ┌────┐      ┌────┐
    │ v1 │      │ v2 │           # Release Notes will include
    └────┘      └────┘
       │           │     ━━━━▶   - D
       ▼           ▼             - C
 A ─ ─ B ─ ─ C ─ ─ D
```

Here, `v2` is the last created version tag. When `octorelease-couscous` runs, it will draft a release with the commit messages for `C` and `D` as the release notes.

If the created version tag is the first one in the repository, then all commit messages from the beginning of the repository's history will be included in the release notes:

```
                ╔════╗           # Release Notes will include
                ║ v1 ║
                ╚════╝           - D
                   │    ━━━━▶   - C
                   ▼             - B
 A ─ ─ B ─ ─ C ─ ─ D             - A
```

In this case, the release notes will contain the messages for `A`, `B`, `C` and `D`.

A version tag is an [annotated tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_annotated_tags) whose name starts with the prefix `v` followed by one or more characters. This means `v1`, `v.1`, `v1.0.0` and `v1.0.0-beta1` are all valid version tags. To learn more about `semver` or Semantic Versioning read [here](https://semver.org).

## Input:

### `repo-token`

**(Required)** The `GITHUB_TOKEN` is used to access the current repository from the GitHub REST API to get commit details.

## Output:

### `release-url`

The URL of the GitHub release draft cooked up. Defaults to an empty string.

## Usage

An example of a workflow that listens for the `create` event and automatically creates a release draft with the commit messages as release notes. It also prints the URL of the release page to the build log.

```yaml
name: Test
on:
  create:
jobs:
  release:
    name: Release
    runs-on: [windows-latest, ubuntu-latest]
    steps:
      - name: Create a release draft for a version tag
        id: create-release-draft
        uses: kartik918/octorelease-couscous@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
      - name: Print the URL of the release draft
        if: steps.create-release-draft.outputs.release-url != ''
        run: echo ${{ steps.create-release-draft.outputs.release-url }}
```
## How It Works:

I made the following graphic to explain (my future self) how a release couscous is prepared (I should stop with the puns). 

<p align="center">
  <img src="https://user-images.githubusercontent.com/48270786/78558625-91512900-7830-11ea-91bf-cd307167a98b.png">
</p>

### Uses:
- GitHub REST API 
- Built upon gh-action Typescript template
