// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';

// // Base URL for your FastAPI backend
// const BASE_URL = "http://13.126.69.224:8000";
// // const BASE_URL = "http://localhost:8000";

// // API Service
// const apiService = {
//     // Login API
//     login: async (email: string, password: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/auth/login/`, { email, password });
//             return response.data.data; // Response contains token
//         } catch (error) {
//             console.error("Login Error:", error);
//             throw error;
//         }
//     },

//     registerUser: async (email: string, password: string, user_type: string = 'regular') => {
//         try {
//             const response = await axios.post(`${BASE_URL}/auth/register/`, { email, password, user_type });
//             console.log("response---", response.data, response.data.data)
//             return response.data; // Response contains token
//         } catch (error) {
//             console.error("Login Error:", error);
//             throw error;
//         }
//     },

//     // Get user by token
//     getUserByToken: async (token: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/auth/get_user_by_token/`, { token });
//             return response.data; // Returns user details
//         } catch (error) {
//             console.error("Get User Error:", error);
//             throw error;
//         }
//     },

//     // Upload Folder API
//     uploadFolder: async (email: string, folderName: string, files: File[]) => {
//         try {
//             const formData = new FormData();
//             formData.append("email", email);
//             formData.append("folder_name", folderName);

//             files.forEach((file) => {
//                 formData.append("files", file); // Append each file
//             });

//             const response = await axios.post(`${BASE_URL}/files/upload_folder/`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             return response.data; // Returns upload status
//         } catch (error) {
//             console.error("Upload Folder Error:", error);
//             throw error;
//         }
//     },

//     fetchFolders: async (email: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/files/list_folders/`, { email });
//             return response.data.data; // Returns user details
//         } catch (error) {
//             console.error("Get File List Error:", error);
//             throw error;
//         }
//     },

//     fetchFiles: async (email: string, folder_name: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/files/list_files/`, { email, folder_name });
//             return response.data; // Returns full response with message
//         } catch (error) {
//             console.error("Get File List Error:", error);
//             throw error;
//         }
//     },

//     getFileById: async (email: string, file_id: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/get_file_details_by_id_api/`, { email, file_id });
//             return response.data; // Returns full response with message
//         } catch (error) {
//             console.error("Get File List Error:", error);
//             throw error;
//         }
//     },
    
//     fetchAllFiles: async (email: string, folder_name?: string, file_name?: string, processed_status?: string, upload_date_start?: string, upload_date_end?: string) => {
//         try {
//             const payload: any = { email };

//             if (folder_name) payload.folder_name = folder_name;
//             if (file_name) payload.file_name = file_name;
//             if (processed_status) payload.processed_status = processed_status;
//             if (upload_date_start) payload.upload_date_start = upload_date_start;
//             if (upload_date_end) payload.upload_date_end = upload_date_end;

//             const response = await axios.post(`${BASE_URL}/get_all_files_api/`, payload);
//             return response.data.data; // Returns full response with message
//         } catch (error) {
//             console.error("Search Files Error:", error);
//             throw error;
//         }
//     },

//     processFolder: async (email: string, folder_name: string, wall_type: string) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/process_new/`, { 
//             email, 
//             folder_name, 
//             wall_type 
//         });
//         return response.data.data; // Returns process result
//     } catch (error) {
//         console.error("Process Folder Error:", error);
//         throw error;
//     }
// },

//     // Delete file or folder API
//     deleteFileOrFolder: async (email: string, username: string, folder_name: string, delete_type: string, filename?: string) => {
//         try {
//             const payload: any = {
//                 email,
//                 username,
//                 folder_name,
//                 delete_type
//             };

//             if (filename) {
//                 payload.filename = filename;
//             }

//             const response = await axios.post(`${BASE_URL}/delete_file_or_folder_api/`, payload);
//             return response.data;
//         } catch (error) {
//             console.error("Delete Error:", error);
//             throw error;
//         }
//     },

//     // Download files for preview API
//     downloadFilesForPreview: async (email: string, username: string, folder_name: string, filename: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/download_files_for_preview_api/`, {
//                 email,
//                 username,
//                 folder_name,
//                 filename
//             });
//             return response.data;
//         } catch (error) {
//             console.error("Download Preview Error:", error);
//             throw error;
//         }
//     },

//     // Get presigned download URL API
//     getPresignedDownloadUrl: async (email: string, username: string, filename: string, file_type: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/get_presigned_download_url_api/`, {
//                 email,
//                 username,
//                 filename,
//                 file_type
//             });
//             return response.data;
//         } catch (error) {
//             console.error("Presigned URL Error:", error);
//             throw error;
//         }
//     },

//     // Get presigned download URL API
//     getStats: async (email: string) => {
//         try {
//             const response = await axios.post(`${BASE_URL}/stats_api/`, {
//                 email
//             });
//             return response.data.data;
//         } catch (error) {
//             console.error("Stats API Error:", error);
//             throw error;
//         }
//     }
// };

// export default apiService;
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// Base URL for your FastAPI backend
const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}:8000` : "https://nasiwak-training.thirdeyedata.ai:8000";
// const BASE_URL = "http://localhost:8000";

// API Service
const apiService = {
    // Login API
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login/`, { email, password });
            // return {
            //     "email": "admin@nasiwak.com",
            //     "user_type": "admin",
            //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG5hc2l3YWsuY29tIiwiZXhwIjoxNzQyMzY0MzE2fQ.2CJjXf7cj0mud6bXMmx8MBC-by4hoB873fPUvUHTzVA",
            //     "username": "admin"
            // }
            return response.data.data; // Response contains token
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    },

    registerUser: async (email: string, password: string, user_type: string = 'regular') => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register/`, { email, password, user_type });
            console.log("response---", response.data, response.data.data)
            return response.data; // Response contains token
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    },

    // Get user by token
    getUserByToken: async (token: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/get_user_by_token/`, { token });
            return response.data; // Returns user details
        } catch (error) {
            console.error("Get User Error:", error);
            throw error;
        }
    },

    // Upload Folder API - Updated with wall_type
    uploadResumes: async (email: string, folderName: string, files: File[], wallType: string) => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("folder_name", folderName);
            formData.append("wall_type", wallType); // Add wall_type parameter

            files.forEach((file) => {
                formData.append("files", file); // Append each file
            });

            const response = await axios.post(`${BASE_URL}/files/upload_folder/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data; // Returns upload status
        } catch (error) {
            console.error("Upload Folder Error:", error);
            throw error;
        }
    },

    // Fetch Folders API - Updated with wall_type
    fetchFolders: async (email: string, wallType?: string) => {
        try {
            const payload: any = { email };
            if (wallType) {
                payload.wall_type = wallType;
            }
            
            const response = await axios.post(`${BASE_URL}/files/list_folders/`, payload);
            return response.data.data; // Returns user details
        } catch (error) {
            console.error("Get File List Error:", error);
            throw error;
        }
    },

    // FIXED: Fetch Files API - Updated with pagination support and new response format
    fetchFiles: async (
        email: string, 
        folderName: string, 
        wallType: string, 
        limit?: number, 
        skip?: number
    ) => {
        try {
            const payload: any = {
                email,
                folder_name: folderName,
                wall_type: wallType
            };
            
            // Add pagination parameters if provided
            if (limit !== undefined) {
                payload.limit = limit;
            }
            if (skip !== undefined) {
                payload.skip = skip;
            }
            
            console.log('fetchFiles API payload:', payload);
            
            // FIXED: Updated endpoint URL to match your backend
            const response = await axios.post(`${BASE_URL}/files/list_files/`, payload);
            
            // Handle new API response format
            if (response.data && response.data.status) {
                console.log('fetchFiles - New API format response:', response.data);
                return response.data; // Returns {status, message, status_code, data: {total_count, records}}
            } else {
                console.log('fetchFiles - Legacy format response:', response.data);
                return response.data; // Returns legacy format
            }
        } catch (error) {
            console.error("Get File List Error:", error);
            throw error;
        }
    },

    // Get File By ID API - No wall_type needed as specified
    getFileById: async (email: string, file_id: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/get_file_details_by_id_api/`, { email, file_id });
            return response.data; // Returns full response with message
        } catch (error) {
            console.error("Get File List Error:", error);
            throw error;
        }
    },
    
    // FIXED: Fetch All Files API - Updated with pagination support and new response format
    fetchAllFiles: async (
        email: string, 
        wallType?: string, 
        limit?: number, 
        skip?: number
    ) => {
        try {
            const payload: any = { email };
            
            if (wallType) {
                payload.wall_type = wallType;
            }
            
            // Add pagination parameters if provided
            if (limit !== undefined) {
                payload.limit = limit;
            }
            if (skip !== undefined) {
                payload.skip = skip;
            }
            
            console.log('fetchAllFiles API payload:', payload);
            
            const response = await axios.post(`${BASE_URL}/get_all_files_api/`, payload);
            
            // Handle new API response format
            if (response.data && response.data.status) {
                console.log('fetchAllFiles - New API format response:', response.data);
                return response.data; // Returns {status, message, status_code, data: {total_count, records}}
            } else {
                console.log('fetchAllFiles - Legacy format response:', response.data);
                return response.data; // Returns legacy format
            }
        } catch (error) {
            console.error("Get All Files Error:", error);
            throw error;
        }
    },

    // Process Folder API - Updated with wall_type
    processFolder: async (email: string, folder_name: string, wall_type: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/process_new/`, { 
                email, 
                folder_name, 
                wall_type 
            });
            return response.data.data; // Returns process result
        } catch (error) {
            console.error("Process Folder Error:", error);
            throw error;
        }
    },

    // Delete file or folder API - Updated with wall_type
    deleteFileOrFolder: async (email: string, username: string, folder_name: string, delete_type: string, wall_type: string, filename?: string) => {
        try {
            const payload: any = {
                email,
                username,
                folder_name,
                delete_type,
                wall_type
            };

            if (filename) {
                payload.filename = filename;
            }

            const response = await axios.post(`${BASE_URL}/delete_file_or_folder_api/`, payload);
            return response.data;
        } catch (error) {
            console.error("Delete Error:", error);
            throw error;
        }
    },

    // Download files for preview API - Updated with wall_type
    downloadFilesForPreview: async (email: string, username: string, folder_name: string, filename: string, wall_type?: string) => {
        try {
            const payload: any = {
                email,
                username,
                folder_name,
                filename
            };

            if (wall_type) {
                payload.wall_type = wall_type;
            }

            const response = await axios.post(`${BASE_URL}/download_files_for_preview_api/`, payload);
            return response.data;
        } catch (error) {
            console.error("Download Preview Error:", error);
            throw error;
        }
    },

    // Get presigned download URL API - Updated with wall_type
    getPresignedDownloadUrl: async (email: string, username: string, filename: string, file_type: string, wall_type?: string) => {
        try {
            const payload: any = {
                email,
                username,
                filename,
                file_type
            };

            if (wall_type) {
                payload.wall_type = wall_type;
            }

            const response = await axios.post(`${BASE_URL}/get_presigned_download_url_api/`, payload);
            return response.data;
        } catch (error) {
            console.error("Presigned URL Error:", error);
            throw error;
        }
    },

    // Get stats API - Updated with wall_type
    getStats: async (email: string, wall_type?: string) => {
        try {
            const payload: any = { email };
            
            if (wall_type) {
                payload.wall_type = wall_type;
            }

            const response = await axios.post(`${BASE_URL}/stats_api/`, payload);
            return response.data.data;
        } catch (error) {
            console.error("Stats API Error:", error);
            throw error;
        }
    },

    // DXF FILES API SECTION - UPDATED FOR DXF FILES PAGE

    // Fetch DXF Files API - Simplified for DXF files page
    fetchDXFFiles: async (email: string, wall_type: string) => {
        try {
            const payload = {
                email,
                wall_type
            };

            const response = await axios.post(`${BASE_URL}/get_dxf_files_api/`, payload);
            return response.data.data; // Returns DXF files list
        } catch (error) {
            console.error("Fetch DXF Files Error:", error);
            throw error;
        }
    },

    // NEW: Get DXF Zip Download URL API - For downloading selected files or all files
    getDXFZipDownloadUrl: async (email: string, wall_type: string, download_all: boolean, file_names?: string[]) => {
        try {
            const payload: any = {
                email,
                wall_type,
                download_all
            };

            // If not downloading all files, include selected filenames
            if (!download_all && file_names && file_names.length > 0) {
                payload.file_names = file_names;
            }

            const response = await axios.post(`${BASE_URL}/get_dxf_zip_download_url_api/`, payload);
            return response.data; // Returns download URL
        } catch (error) {
            console.error("Get DXF Zip Download URL Error:", error);
            throw error;
        }
    }
};

export default apiService;