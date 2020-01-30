import * as fs from 'fs';

/**
 * Returns true or false based on the existence of a file.
 * @param path The file path that will be checked for existence.
 */
export const pathExists = (path: string): boolean => {
    return fs.existsSync(path);
};

/**
 * Returns true or false based on the access of a file based on the provided mode (fs.constants).
 * @param path The file path that will be checked for access.
 * @param mode The mode to attempt to access, e.g read, write. (use fs.constants)
 */
export const canAccessPath = (path: string, mode?: number): boolean => {
    try {
        fs.accessSync(path, mode);
        return true;
    } catch (error) {
        return error.code === 'ENOENT';
    }
};