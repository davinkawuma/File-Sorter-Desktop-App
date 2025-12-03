import sys
import os #This is a module that allows you to mimmick cli os commands but in python
import shutil #this module is apart of python's original library that provides ways to copy, move, and modify files 


class SortFiles: 

    def __init__(self, source_folder, folder_name_and_types_Dict):
        self.source_folder = source_folder
        self.folder_name_and_types_Dict = folder_name_and_types_Dict

    def new_folder_maker(self, source_folder, folder_name_and_types_Dict): #makes the new folders internally 

        folders_and_fileTypes = {}

        for x in folder_name_and_types_Dict:

            #clean_path = source_folder.strip('"').strip("'")
            #source_folder = os.path.normpath(clean_path)

            folderName_path = os.path.join(source_folder, x)# this makes the directory path; I want the path 
                                                                     # to fall under the the source folder; --> C:/source_folder/images            
            if os.path.exists(folderName_path):
                print("Folder and folder path already exists!!")
            else:
                os.makedirs(folderName_path, exist_ok = True) #makes the folder for each folder name; {images, videos, program files, etc}

        return folders_and_fileTypes

    def file_classify(self, source_folder):

        file_and_typeExtensions = {}
        print("source folder: ", source_folder)

        #source_folder = os.path.normpath(clean_path)

        for file in os.listdir(source_folder):
        
            file_path = os.path.join(source_folder, file)

            if os.path.isfile(file_path):
    
                #file_name = os.path.basename(file_path)
                type_extension = file_path.split(".")[-1].lower()
                file_and_typeExtensions[file_path] = type_extension
                #print(f"Dictionary value for key: {file_name} and value: {file_and_typeExtensions[file_name]}")
                #print(f"File Path: {file_path}")

        return file_and_typeExtensions
    
    def final_sort(self, folder_name_and_types_Dict, all_files_array):

        for file in all_files_array: 

            for key in folder_name_and_types_Dict: 

                if file.split(".")[-1] in folder_name_and_types_Dict[key]:


                    shutil.move(file, key )
                    #print(f"File: {os.path.basename(key)} was moved in to dir {os.path.basename(k)}!!")
                else:
                    print()

        return 0 
    
    def main(self, source_folder, folder_name_and_types_Dict):

        self.new_folder_maker(source_folder, folder_name_and_types_Dict)
        print('bro this was done')
        #print("Source Folder Path:", source_folder)

if __name__ == "__main__":

    source_folder = sys.argv[1] #source folder will have the absolute path of the file
    folder_name_and_types_Dict = sys.argv[2]
    all_files_arrayOfObjects = sys.argv[3]

    sorter = SortFiles(source_folder, folder_name_and_types_Dict)

    sorter.main(sorter.source_folder, sorter.folder_name_and_types_Dict)
