exports.port = process.env.PORT || 3000
exports.origin = process.env.REACT_APP_BACKEND || `http://localhost:${exports.port}`
