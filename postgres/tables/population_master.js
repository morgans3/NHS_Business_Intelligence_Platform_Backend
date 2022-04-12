let createQuery = `-- Table: public.population_master

-- DROP TABLE IF EXISTS public.population_master;

CREATE TABLE IF NOT EXISTS public.population_master
(
    gpp_code text COLLATE pg_catalog."default",
    practice text COLLATE pg_catalog."default",
    ccg_code text COLLATE pg_catalog."default",
    ccg text COLLATE pg_catalog."default",
    icp text COLLATE pg_catalog."default",
    age double precision,
    age_group text COLLATE pg_catalog."default",
    age_category text COLLATE pg_catalog."default",
    sex text COLLATE pg_catalog."default",
    risk_score double precision,
    risk_score_int double precision,
    rs_frailty text COLLATE pg_catalog."default",
    rs_frailty_index text COLLATE pg_catalog."default",
    rs_total_ltcs double precision,
    risk_of_nel_register boolean,
    housebound text COLLATE pg_catalog."default",
    palliative_care text COLLATE pg_catalog."default",
    community_matron_status text COLLATE pg_catalog."default",
    community_matron_type boolean,
    community_matron_status_type text COLLATE pg_catalog."default",
    community_matron boolean,
    pcn text COLLATE pg_catalog."default",
    lsoa text COLLATE pg_catalog."default",
    lsoa_name text COLLATE pg_catalog."default",
    nhs_number text COLLATE pg_catalog."default" NOT NULL,
    address_line_1 text COLLATE pg_catalog."default",
    address_line_2 text COLLATE pg_catalog."default",
    address_line_3 text COLLATE pg_catalog."default",
    address_line_4 text COLLATE pg_catalog."default",
    address_line_5 text COLLATE pg_catalog."default",
    postcode text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    forename text COLLATE pg_catalog."default",
    other_forenames text COLLATE pg_catalog."default",
    surname text COLLATE pg_catalog."default",
    electoral_ward_or_division text COLLATE pg_catalog."default",
    ward_name text COLLATE pg_catalog."default",
    residential_institution text COLLATE pg_catalog."default",
    date_of_birth date,
    ics text COLLATE pg_catalog."default",
    date_of_death date,
    landline text COLLATE pg_catalog."default",
    mobile text COLLATE pg_catalog."default",
    asthma boolean,
    chd boolean,
    heart_failure boolean,
    cancer boolean,
    copd boolean,
    depression boolean,
    diabetes boolean,
    hypertension boolean,
    atrial_fibrillation boolean,
    ckd boolean,
    dementia boolean,
    epilepsy boolean,
    hypothyroid boolean,
    mental_health boolean,
    learning_disabilities boolean,
    osteoporosis boolean,
    pad boolean,
    rheumatoid_arthritis boolean,
    stroke_tia boolean,
    palliative_care_flag boolean,
    smoker boolean,
    substance_misuse boolean,
    psychotic_disorder_flag boolean,
    cdiff_flag boolean,
    oxygen_flag boolean,
    care_plan_flag boolean,
    dispensing_flag boolean,
    spl boolean,
    chemo_radiotherapy boolean,
    haematological_cancers boolean,
    pregnant_with_congenital_heart_defect boolean,
    rare_diseases boolean,
    respiratory boolean,
    transplant boolean,
    deceased_flag boolean,
    etl_run_date date,
    covid_risk text COLLATE pg_catalog."default",
    reason text COLLATE pg_catalog."default",
    covid_vuln text COLLATE pg_catalog."default",
    CONSTRAINT population_master_pkey PRIMARY KEY (nhs_number)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.population_master
    OWNER to postgres;`;

module.exports.createQuery = createQuery;