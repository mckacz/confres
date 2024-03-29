import * as yup from 'yup'
import {
  CamelCaseKeyMapper,
  DotEnvLoader,
  OptionalLoader,
  ProcessEnvLoader,
  SyncResolver,
  YupProcessor,
} from 'confres'

const schema = yup.object({
  debug: yup.boolean().default(false),
  port:  yup.number().required().min(1024).max(4096),
  db:    yup.object({
    host:     yup.string().required(),
    port:     yup.number().required(),
    name:     yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  }).required(),
})

const keyMapper = new CamelCaseKeyMapper({ prefix: 'APP__' })

const resolver = new SyncResolver(
  [
    new DotEnvLoader(keyMapper, '.env'),
    new OptionalLoader(new DotEnvLoader(keyMapper, '.env.local')),
    new ProcessEnvLoader(keyMapper),
  ],
  [
    new YupProcessor(schema),
  ],
)

try {
  const config = resolver.resolve()
  console.log(JSON.stringify(config, null, 2))
} catch (ex) {
  console.error(ex)
  process.exit(1)
}
