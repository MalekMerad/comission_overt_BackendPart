const db = require('../../Config/dbSql');

module.exports = {
    addSupplierSQL: async (data) => {
        try {
            const {
                NomSociete,
                NatureJuridique,
                Adresse,
                Telephone,
                Rc,
                Nif,
                Rib,
                Email,
                Ai,
                AgenceBancaire,
                adminId
            } = data;

            await db.query(
                'CALL insertFournisseur(@returnCode, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [NomSociete, NatureJuridique, Adresse, Telephone, Rc, Nif, Rib, Email, Ai, AgenceBancaire, adminId]
            );

            const [rows] = await db.query('SELECT @returnCode AS code');
            const resultCode = rows[0]?.code ?? null;

            if (resultCode === 0) {
                return {
                    success: true,
                    code: 0,
                    message: "Supplier added successfully.",
                };
            }

            if (resultCode === 1001) {
                return {
                    success: false,
                    code: 1001,
                    message: "Supplier already exists.",
                };
            }

            return {
                success: false,
                code: 5000,
                message: "General error occurred.",
            };
        } catch (error) {
            console.error('Service error (addSupplierSQL):', error);
            return {
                success: false,
                code: 5000,
                message: "Database error occurred.",
                error: error.message,
            };
        }
    },
};