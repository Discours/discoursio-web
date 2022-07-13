import { createReadStream } from 'fs';
import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  })

export default async function handler( req, res ) {
  await s3.upload({
    Bucket: process.env.S3_BUCKET || 'discours-io',
    Key: 'file-name',
    Body: createReadStream('file-path'),
  })
  res.status(200).json(post)
}