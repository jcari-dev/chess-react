const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const endpoints = {
  checkRoom: `${API_BASE_URL}${process.env.REACT_APP_CHECK_ROOM_ENDPOINT}`,
  getCsrfToken: `${API_BASE_URL}${process.env.REACT_APP_GET_CSRF_TOKEN_ENDPOINT}`,
  updateMatch: `${API_BASE_URL}${process.env.REACT_APP_UPDATE_MATCH_ENDPOINT}`,
  checkTurn: `${API_BASE_URL}${process.env.REACT_APP_CHECK_TURN_ENDPOINT}`,
  getFen: `${API_BASE_URL}${process.env.REACT_APP_GET_FEN_ENDPOINT}`,
  getTurn: `${API_BASE_URL}${process.env.REACT_APP_GET_TURN_ENDPOINT}`,
  getPlayerColor: `${API_BASE_URL}${process.env.REACT_APP_GET_PLAYER_COLOR_ENDPOINT}`,
  getValidMoves: `${API_BASE_URL}${process.env.REACT_APP_GET_VALID_MOVES_ENDPOINT}`,
  checkMoveContinuation: `${API_BASE_URL}${process.env.REACT_APP_CHECK_MOVE_CONTINUATION_ENDPOINT}`,
  createRoom: `${API_BASE_URL}${process.env.REACT_APP_CREATE_ROOM_ENDPOINT}`,
  joinRoom: `${API_BASE_URL}${process.env.REACT_APP_JOIN_ROOM_ENDPOINT}`,
  validateMove: `${API_BASE_URL}${process.env.REACT_APP_VALIDATE_MOVE_ENDPOINT}`,
  vitals: `${API_BASE_URL}${process.env.REACT_APP_VITALS}`,
  getProfile: `${API_BASE_URL}${process.env.REACT_APP_GET_PROFILE_ENDPOINT}`,
  cpuCreateRoom: `${API_BASE_URL}${process.env.REACT_APP_CPU_CREATE_ROOM}`,
  checkTurnCpu: `${API_BASE_URL}${process.env.REACT_APP_CHECK_TURN_CPU_ENDPOINT}`,
};

export default endpoints;
