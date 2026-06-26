import * as Minio from 'minio';
import { randomUUID } from 'crypto';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const BUCKET = process.env.MINIO_BUCKET || 'sevenss-media';

export async function ensureBucket() {
  const exists = await minioClient.bucketExists(BUCKET);
  if (!exists) {
    await minioClient.makeBucket(BUCKET, 'us-east-1');
    // Set public read policy
    const policy = JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${BUCKET}/*`],
        },
      ],
    });
    await minioClient.setBucketPolicy(BUCKET, policy);
  }
}

export async function uploadFile(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  await ensureBucket();
  const objectName = `${randomUUID()}`;
  await minioClient.putObject(BUCKET, objectName, buffer, buffer.length, {
    'Content-Type': contentType,
  });
  // Use external URL for serving images
  const externalUrl = process.env.MINIO_EXTERNAL_URL || 'https://file-server.tbricks.co.ke';
  const minioUrl = `${externalUrl}/${BUCKET}/${objectName}`;
  return minioUrl;
}

export async function deleteFile(url: string) {
  try {
    // Extract object name from URL regardless of the domain
    const objectName = url.split(`/${BUCKET}/`)[1];
    if (objectName) {
      await minioClient.removeObject(BUCKET, objectName);
    }
  } catch (e) {
    console.error('MinIO delete error:', e);
  }
}

export default minioClient;
