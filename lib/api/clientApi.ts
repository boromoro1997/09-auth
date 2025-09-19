import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note , NewNote} from "@/types/note";
export type Request = {
email: string;
password: string;
}
type CheckSessionRequest = {
  success: boolean;
};
export type UpdateUserRequest = {
  username?: string;
};
interface Response {
  notes: Note[],
  totalPages:number,
}
export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
export const register = async (data: Request) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: Request) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};


export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};
export  async function fetchNotes(page:number,search:string="",tag?:string):Promise<Response> {
    const response = await nextServer.get<Response>("/notes", {
          params: {
          search,
          tag,
          page,
          }
    })
    return response.data;
}

export async function createNote(newNote:NewNote) {
    const res = await nextServer.post<Note>("/notes", newNote);
    return res.data;
}
export async function deleteNote(id:string) {
    const res = await nextServer.delete<Note>("/notes/"+`${id}`);
    return res.data;
}
export async function clientFetchNoteById(id: string): Promise<Note> {
    const response = await nextServer.get<Note>("/notes/"+`/${id}`)
    return response.data;
}