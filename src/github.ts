import * as gh from "@actions/github"
import * as version from './version'
import * as markdown from './markdown'
import * as core from '@actions/core'

export async function createReleaseDraft(
    versionTag: string,
    repoToken: string,
    changeLog: string
): Promise<string> {
    const octokit = new gh.GitHub(repoToken)

    const response = await octokit.repos.createRelease({
        owner: gh.context.repo.owner,
        repo: gh.context.repo.repo,
        tag_name: versionTag,
        name: version.removePrefix(versionTag),
        body: markdown.toUnorderedList(changeLog),
        prerelease: version.isPrerelease(versionTag),
        draft: true
    })
    if (response.status != 201){
        throw new Error('Failed to create release draft couscous: ${response.status}')
    }

    core.info('Created successful release draft couscous ${response.data.name}')
    return response.data.html_url
}
