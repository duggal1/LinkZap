import { resetDatabase } from './reset';

async function main() {
  console.log('🔄 Starting database reset...');
  
  const result = await resetDatabase();
  
  if (result.success) {
    console.log('✨ Database reset completed successfully!');
    process.exit(0);
  } else {
    console.error('❌ Database reset failed:', result.error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});