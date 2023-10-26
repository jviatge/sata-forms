cd sata-forms
pnpm run build
cd ../
zip -r sata-forms-plugin.zip ./sata-forms -x "./sata-forms/node_modules/*" -x "./sata-forms/*.git*" -x "./sata-forms/*.DS_Store"
mv sata-forms-plugin.zip ./sata-forms