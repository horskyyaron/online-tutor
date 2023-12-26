export type HandshakeData = {
  role: string;
};

export type UpdatedTextData = {
  updatedText: string;
};

export type SessionData = {
  challenge_id: number;
  code: string;
};

export type ServerStatus = {
  tutorSocketId: string;
  studentSocketId: string;
  challenge_id: number;
};
