
#!/bin/bash

set -e  # berhenti jika ada error

echo " Build project"
npm run build

echo "Checkout orphan branch production"
git checkout --orphan production

echo "Hapus semua file lama (tanpa menyentuh .git)"
git rm -rf . >/dev/null 2>&1

# Pastikan dist ada
if [ ! -d "dist" ]; then
    echo "❌ Folder dist/ tidak ditemukan!"
    exit 1
fi

echo "Copy isi dist ke root"
cp -r dist/* .

echo " Hapus folder dist"
rm -rf dist

echo " Buat .gitignore supaya node_modules tidak ikut"
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "README.md" >> .gitignore  

echo " Add semua file ke git"
git add .

echo "Commit perubahan"
git commit -m "Deploy production build (clean, no node_modules)"

echo "Push paksa ke production"
git push origin production --force

echo " Kembali ke main branch"
git switch main  # lebih modern dan aman daripada checkout
