import * as core from '@actions/core'
import {run} from '../src/main'

jest.mock('@actions/core')
describe('When running the action', () => {
  const fakeSetOuput = core.setOutput as jest.MockedFunction<typeof core.setOutput>

  test('Should set the release-url output parameter', async() => {
    await run()
    expect(fakeSetOuput).toHaveBeenCalledWith('release-url', expect.anything())
  })
})