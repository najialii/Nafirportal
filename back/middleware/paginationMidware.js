const paginationMidWear = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const results = {};

        try {
            const totalDocuments = await model.countDocuments().exec();
            console.log("Total Documents:", totalDocuments); // Debugging log

            if (startIndex + limit < totalDocuments) {
                results.next = { page: page + 1, limit: limit };
            }
            if (startIndex > 0) {
                results.previous = { page: page - 1, limit: limit };
            }

            results.results = await model.find().limit(limit).skip(startIndex).exec();
            console.log("Paginated Results:", results.results); // Debugging log

            res.paginationRes = results;
            next();
        } catch (error) {
            console.error("Pagination Middleware Error:", error);
            res.status(500).json({ message: error.message });
        }
    };
};

module.exports = paginationMidWear;
