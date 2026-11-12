# PhotoSkillPath Article Package

This package contains the current article corpus for the Photo Skill Path website.

## Contents

- `articles/` — 30 article pairs in Markdown and JSON format.
- `article-manifest.json` — article inventory, slugs, categories, evidence mode, and metadata.
- `audits/review-report-batch-05-merged.md` — latest merged independent review for Batch 05.
- `audits/similarity-batch-05-merged.json` — six-article similarity result for Batch 05.

## Version rule

Batch 05 articles EXP-05, EXP-06, and FOC-05 use the final `revision-007` versions. They replace the older copies that remain in the working repository for audit history. COM-05, PHO-05, and EDI-05 use the current article versions.

## Editorial status

- Evidence mode: `research_only`
- Reader language: English
- Audience: global beginners using phones or entry-level cameras
- No article should be treated as a personal hands-on test, product ranking, or universal device instruction.
- Article-level approval does not mean the website is published or AdSense-approved.

## Import guidance

Import the Markdown files into the article template and use the JSON files for metadata, source links, claim mappings, and internal-link fields. Keep the article IDs and slugs stable unless the site implementation has a documented redirect plan.
