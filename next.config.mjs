import { execSync } from 'child_process';

function getGitInfo() {
  try {
    const commitShaShort = execSync('git rev-parse --short HEAD').toString().trim();
    const commitSha = execSync('git rev-parse HEAD').toString().trim();
    const commitDate = execSync('git log -1 --date=short --pretty=%cd').toString().trim();
    return { commitShaShort, commitSha, commitDate };
  } catch {
    return { commitShaShort: 'unknown', commitSha: 'unknown', commitDate: 'unknown' };
  }
}

const { commitShaShort, commitSha, commitDate } = getGitInfo();

console.log(`\n🪄 Building with commit ${commitSha} (${commitDate})\n`);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GIT_COMMIT_SHA_SHORT: commitShaShort,
    NEXT_PUBLIC_GIT_COMMIT_SHA: commitSha,
    NEXT_PUBLIC_GIT_COMMIT_DATE: commitDate,
  },
  output: 'standalone',
  allowedDevOrigins: ['*'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      {
        protocol: 'https',
        hostname: 'avatar-management--avatars.us-west-2.prod.public.atl-paas.net',
      },
    ],
  },
};
export default nextConfig;
