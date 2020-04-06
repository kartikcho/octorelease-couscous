import * as gh from '@actions/github'
import * as core from '@actions/core'

export function getCreatedTag(): string | null {
  if (gh.context.eventName !== 'create') {
    core.info('The event ${gh.context.eventName} occurred')
    return null
  }
  if (gh.context.payload.ref_type !== 'tag') {
    core.info('The created reference was a branch, not a tag')
    return null
  }
  return gh.context.payload.ref
}
