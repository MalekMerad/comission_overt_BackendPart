const { poolPromise, sql } = require("../../Config/dbSqlServer");
const {generateIDS} = require('../../Helper');


// Function to insert potential supplier 
const insertPotentialSupplier = async (
    aId,
    aNom,
    aAdresse,
    aTelephone,
    aEmail,
    aAdminID
) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input("Id", sql.UniqueIdentifier, aId)
            .input("Nom", sql.NVARCHAR(100), aNom)
            .input("Adresse", sql.NVARCHAR(100), aAdresse)
            .input("Telephone", sql.NVARCHAR(50), aTelephone)
            .input("Email", sql.NVARCHAR(100), aEmail)
            .input("Status", sql.Int, 1)
            .input("adminId", sql.UniqueIdentifier, aAdminID)
            .query(`INSERT INTO FOURNISSEURS 
                (Id, Nom, Adresse, Telephone, Email, Status, adminId)
                VALUES (@Id, @Nom, @Adresse, @Telephone, @Email, @Status, @adminId)`);
    } catch (error) {
        console.error("insertPotentialSupplier error:", error);
        throw error;
    }
};


module.exports = {
    addSupplierSQL: async (data) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("aNom", sql.NVARCHAR(100), data.Nom)
                .input("aNatureJuridique", sql.NVARCHAR(50), data.NatureJuridique)
                .input("aAdresse", sql.NVARCHAR(50), data.Adresse)
                .input("aTelephone", sql.NVARCHAR(50), data.Telephone)
                .input("aRc", sql.NVARCHAR(50), data.Rc)
                .input("aNif", sql.NVARCHAR(50), data.Nif)
                .input("aRib", sql.NVARCHAR(50), data.Rib)
                .input("aEmail", sql.NVARCHAR(50), data.Email)
                .input("aAi", sql.NVARCHAR(50), data.Ai)
                .input("aAgenceBancaire", sql.NVARCHAR(50), data.AgenceBancaire)
                .input("adminID", sql.UniqueIdentifier, data.adminId)
                .execute("insertFournisseur");

            const insertCode = result.returnValue;

            switch (insertCode) {
                case 0:
                    return {
                        success: true,
                        code: 0,
                        message: "Fournisseur ajouté avec succès.",
                        supplier: { ...data, Status: 1 }
                    };
                case 1002:
                    return { success: false, code: 1002, message: "Ce Registre de Commerce (RC) existe déjà." };
                case 1003:
                    return { success: false, code: 1003, message: "Ce NIF existe déjà." };
                case 1004:
                    return { success: false, code: 1004, message: "Ce numéro de téléphone existe déjà." };
                case 1005:
                    return { success: false, code: 1005, message: "Cet email ou RIB existe déjà." };
                case 1006:
                    return { success: false, code: 1006, message: "Ce numéro AI existe déjà." };
                default:
                    return { success: false, code: 5000, message: "Erreur serveur SQL." };
            }
        } catch (error) {
            console.error("SQL Error Details:", error.message);
            return {
                success: false,
                code: 5000,
                message: "Erreur de base de données.",
                error: error.message
            };
        }
    },
    deleteFournisseur: async (id) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("aId", sql.UniqueIdentifier, id)
                .execute("deleteFournisseur");

            const code = result.returnValue;

            switch (code) {
                case 0:
                    return { success: true, code: 0, message: "Fournisseur archivé avec succès." };
                case 2000:
                    return {
                        success: false,
                        code: 2000,
                        message: "Impossible de supprimer ce fournisseur car il existe dans une opération de retrait (Retrait Cahier des Charges)."
                    };
                case 2005:
                    return {
                        success: false,
                        code: 2005,
                        message: "Fournisseur introuvable ou déjà archivé."
                    };
                default:
                    return {
                        success: false,
                        code: 5000,
                        message: "Erreur interne serveur SQL lors de la suppression du fournisseur."
                    };
            }
        } catch (error) {
            console.error("Service error (deleteFournisseur):", error);
            return {
                success: false,
                code: 5000,
                message: "Erreur de base de données lors de la suppression du fournisseur.",
                error: error.message
            };
        }
    },

    updateFournisseur: async (data) => {9
        try {
            const {
                Id,
                Nom,
                NatureJuridique,
                Adresse,
                Telephone,
                Email,
                AgenceBancaire
            } = data;
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("aId", sql.UniqueIdentifier, Id)
                .input("aNom", sql.NVARCHAR(100), Nom) 
                .input("aNatureJuridique", sql.NVARCHAR(50), NatureJuridique)
                .input("aAdresse", sql.NVARCHAR(50), Adresse)
                .input("aTelephone", sql.NVARCHAR(50), Telephone)
                .input("aEmail", sql.NVARCHAR(50), Email)
                .input("aAgenceBancaire", sql.NVARCHAR(50), AgenceBancaire)
                .execute("updateFournisseur");

            const updateCode = result.returnValue;
            return { success: updateCode === 0, code: updateCode };
        } catch (error) {
            console.error("Service error (updateFournisseur):", error);
            return { success: false, code: 5000 };
        }
    },
    selectAllFournisseurs: async (adminID) => {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('adminID', sql.UniqueIdentifier, adminID)
                .query("SELECT * FROM selectAllFournisseurs(@adminID)");
            console.log('result.recordset :', result.recordset)
            return { success: true, data: result.recordset };
        } catch (error) {
            console.error("Service error (selectAllFournisseurs):", error);
            return { success: false, data: [] };
        }
    },

    insertSelectedSupplier: async (data) => {
        try {
            const {
                Nom,
                Adresse,
                Telephone,
                Email,
                adminID
            } = data;
            const id = generateIDS();
            insertPotentialSupplier(id ,Nom, Adresse, Telephone, Email, adminID);
            return { success: true };
        } catch (error) {
            if (error && (error.number === 1004 || error.number === 1005)) {
                let msg = "";
                if (error.number === 1004) {
                    msg = "Le numéro de téléphone est déjà utilisé";
                } else if (error.number === 1005) {
                    msg = "L'email est déjà utilisé.";
                }
                return { success: false, code: error.number, message: msg };
            }
            console.error("Service error (insertSelectedSupplier):", error);
            return { success: false, code: 5000, message: error.message };
        }
    },
}