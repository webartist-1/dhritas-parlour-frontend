export interface Folder {
    last_processed_time(last_processed_time: string | Date): import("react").ReactNode;
    name: string;
    id: string;
    files: File[];
    processed_files: number;
    pending_files: number;
    total_files: number;
    created_date: string | Date;
    status: string;
    wallType: 'external' | 'combined';
}

export interface File {
    id: number;
    email: string;
    username: string;
    folder_name: string;
    file_name: string;
    server_file_path: string;
    processed_status: string;
    upload_date: string;
    process_date: string;
    process_time: string;
    processed_image_folder_path: string;
    processed_image_url: string;
    dxf_file_path: string;
}

