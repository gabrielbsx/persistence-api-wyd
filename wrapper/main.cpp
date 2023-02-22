#include "iostream"
#include "string"
#include "filesystem"
#include "fstream"

void readAndExecuteImportFilesOnFolder(std::string folder, std::string importType)
{
  for (const auto &entry : std::filesystem::directory_iterator(folder))
  {
    std::ifstream importFile(entry.path());
    if (!importFile.is_open())
    {
      std::cout << "Error opening file" << entry.path() << '\n';
      continue;
    }
    std::string importText((std::istreambuf_iterator<char>(importFile)), std::istreambuf_iterator<char>());
    importFile.close();
    if (importText.empty())
    {
      std::cout << "File is empty" << entry.path() << '\n';
      continue;
    }
    std::istringstream iss(importText);
    std::string username, password;
    iss >> username >> password;
    std::cout << username << " " << password << '\n';
    if (importType == "import-password")
    {
    }
    else if (importType == "import-user")
    {
    }
    else
    {
      std::cout << "Unknown import type"
                << '\n';
    }
    return;
  }
}

int main()
{
  const auto importUserFolder{std::filesystem::current_path() / "../" / "../" / "mock/server/dbsrv/run/import-password"};
  readAndExecuteImportFilesOnFolder(importUserFolder, "import-password");
  return 0;
}