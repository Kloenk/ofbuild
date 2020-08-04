import * as core from '@actions/core'
//const github = require('@actions/github');
import * as github from '@actions/github'
import * as Webhooks from '@octokit/webhooks'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    /*const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.info(github.event);

    core.setOutput('time', new Date().toTimeString())*/

    /*if (github.context.eventName === 'push') {
      const pushPayload = github.context.payload; // as Webhooks.WebhookPayloadPush;
      core.info(`The head commit is: ${JSON.stringify(pushPayload)}`);
    } else {
      core.info(`foobar: ${JSON.stringify(github.context.payload)}`);
    };*/
    const packages = await parse_title();
    core.setOutput('package', packages.join(", "));
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function parse_title(): Promise<Array<string>> {
    const context = github.context.payload;
    if (context.hasOwnProperty('pull_request')) {
      const title = String(context.pull_request!.title);
      core.info(`title: ${context.pull_request!.title}`);

      var split = title.split(":", 2);
      split = split[0].split(",");
      core.info(`packages: ${split}`);
      return split;
    } else {
      //core.info(`object: ${JSON.stringify(github)}`);
      core.warning(`not a pull request`);
      return [ ];
    }

    return [ "string" ];
}

run()
