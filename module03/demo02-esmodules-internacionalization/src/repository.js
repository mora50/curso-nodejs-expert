import { writeFile, readFile } from 'fs/promises';
class Repository {
  async save(item) {
    const { pathname: databaseFile } = new URL(
      './../database.json',
      import.meta.url
    );

    const currentData = JSON.parse(await readFile(databaseFile));

    currentData.push(item);

    await writeFile(databaseFile, JSON.stringify(currentData));
  }
}

export default Repository;
