const fs = require('fs');
const path = require('path');

const startDate = new Date('2026-04-20T00:00:00Z'); // Monday 20/04/2026
const worklogDir = path.join(__dirname, 'content', '1_nhat_ky_cong_viec');

function formatDate(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
}

// Exactly 11 weeks from 20/04 to 05/07
for (let week = 1; week <= 11; week++) {
    const filePath = path.join(worklogDir, `${week}_tuan_${week}.md`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    const lines = content.split('\n');
    const newLines = lines.map(line => {
        const match = line.match(/^\|\s*(\d)\s*\|(.*)/);
        if (match) {
            const dayOfWeek = parseInt(match[1]); // 2 to 7
            if (dayOfWeek >= 2 && dayOfWeek <= 7) {
                const dayOffset = dayOfWeek - 2;
                const dateForThisDay = new Date(startDate.getTime());
                dateForThisDay.setDate(dateForThisDay.getDate() + (week - 1) * 7 + dayOffset);
                const dateStr = formatDate(dateForThisDay);
                
                const parts = line.split('|');
                if (parts.length >= 6) {
                    parts[3] = ` ${dateStr} `;
                    parts[4] = ` ${dateStr} `;
                    return parts.join('|');
                }
            }
        }
        return line;
    });

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
}

// Remove leftover files from week 12 to 19
for (let week = 12; week <= 19; week++) {
    const filePath = path.join(worklogDir, `${week}_tuan_${week}.md`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

console.log('Dates corrected starting from 20/04/2026. Extra weeks removed.');
