import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToScan = [
    path.join(__dirname, 'public'),
    path.join(__dirname, 'src/assets')
];

const extensions = ['.png', '.jpg', '.jpeg'];

async function optimizeImages() {
    console.log('Starting image optimization (WebP conversion)...');

    for (const dir of dirsToScan) {
        if (!fs.existsSync(dir)) {
            console.warn(`Directory not found: ${dir}`);
            continue;
        }

        // Recursive file walker
        async function walk(currentDir) {
            const files = fs.readdirSync(currentDir);

            for (const file of files) {
                const filePath = path.join(currentDir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    await walk(filePath);
                } else {
                    const ext = path.extname(file).toLowerCase();
                    if (extensions.includes(ext)) {
                        console.log(`Processing: ${filePath} (${(stat.size / 1024).toFixed(2)} KB)`);

                        // We will generate a WebP version
                        const webpPath = filePath.replace(ext, '.webp');

                        try {
                            // Check if webp already exists and is smaller/newer? 
                            // For now, let's just force regenerate if original is there.

                            await sharp(filePath)
                                .webp({ quality: 80 })
                                .toFile(webpPath);

                            const originalSize = stat.size;
                            const newSize = fs.statSync(webpPath).size;

                            console.log(`Generated WebP: ${webpPath} (${(newSize / 1024).toFixed(2)} KB)`);

                            if (newSize < originalSize) {
                                console.log(`Savings: ${((originalSize - newSize) / 1024).toFixed(2)} KB`);
                            } else {
                                console.log('WebP was larger (unlikely but possible), kept both.');
                            }

                        } catch (err) {
                            console.error(`Error processing ${file}:`, err);
                        }
                    }
                }
            }
        }

        await walk(dir);
    }

    console.log('Image optimization complete.');
}

optimizeImages();
