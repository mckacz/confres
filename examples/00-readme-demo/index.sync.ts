import * as yup from 'yup'
import Confres from 'confres'

const schema = yup.object({
  port: yup.number().required().min(1024).max(4096).default(3000),
  db:   yup.object({
    host:     yup.string().required().default('localhost'),
    port:     yup.number().required().default(5432),
    name:     yup.string().required().default('app'),
    username: yup.string().required().default('app'),
    password: yup.string().required().default('app'),
  }).required(),
})

try {
  const config = Confres.resolve(Confres.yupDotEnvSync({
    schema:    schema,
    keyMapper: {
      prefix: 'APP__',
      separator: '__',
    },
  }))

  console.log(JSON.stringify(config, null, 2))
} catch {
  process.exit(1)
}
