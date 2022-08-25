const slackifyMarkdown = require('slackify-markdown')
const { chunkifyString } = require('semantic-release-slack-bot/lib/chunkifier')

const onSuccessFunction = (pluginConfig, context) => {
  const releaseNotes = slackifyMarkdown(context.nextRelease.notes)

  return {
    text: '',
    blocks: [
      ...chunkifyString(releaseNotes, 2900).map((chunk, i) => {
        return {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: i === 0 ? '*Storefront Starter Kit* ' + chunk : chunk,
          },
        }
      }),
    ],
  }
}

module.exports = {
  branches: ['stable'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json'],
        message:
          'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
    [
      'semantic-release-slack-bot',
      {
        notifyOnSuccess: false,
        notifyOnFail: false,
        markdownReleaseNotes: true,
        branchesConfig: [
          {
            pattern: 'stable',
            notifyOnSuccess: true,
            onSuccessFunction,
            notifyOnFail: false,
          },
        ],
      },
    ],
  ],
}
