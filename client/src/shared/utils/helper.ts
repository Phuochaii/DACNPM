import axios from "axios"
import { CampaignFromServer } from "../types/Campaign.type"
import { CompanyFromServer } from "../types/Company.type"
import { EmployerFromServer } from "../types/Employer.type"
import { Field, RecruitmentFromServer } from "../types/Recruitment.type"
import { ApplicationFromServer } from "../types/Application.type"
import { UserFromServer } from "../types/User.type"

const serverURL = 'http://localhost:3000'

export async function getAllCampaigns(page:number = 1) {
    const response = await axios.get(`${serverURL}/company/campaign/all?page=${page}`)
    const rawCampaigns: CampaignFromServer[] = response.data.data;
    const totalPages = response.data.total_page;
    return {allCampaigns: rawCampaigns, totalPages: totalPages};
}

export async function getCampaignById(id: number) {
    const response = await axios.get(`${serverURL}/company/campaign/${id}`)
    const rawCampaign: CampaignFromServer = response.data;
    return rawCampaign;
}

export async function getCampaignByHRId(id: number, page:number = 1) {
     const response = await axios.get(`${serverURL}/company/campaign/employer/${id}?page=${page}`)
    const rawCampaigns: CampaignFromServer[] = response.data.data;
    const totalPages = response.data.total_page;
    return {allCampaigns: rawCampaigns, totalPages:totalPages};
}


export async function getAllCompanies(page: number = 1) {
    const response = await axios.get(`${serverURL}/company/all?page=${page}`)
    const rawCompanies: CompanyFromServer[] = response.data.data;
    const totalPages = response.data.total_page;
    const total = response.data.total;
    return {allCompanies: rawCompanies, totalPages: totalPages, total: total};
}

export async function getCompanyById(id:number) {
    const response = await axios.get(`${serverURL}/company/${id}`);
    if (response.status != 200) return null;
    const rawCompany: CompanyFromServer = response.data;
    return rawCompany;
}

export async function getAllEmployer() {
    const response = await axios.get(`${serverURL}/employer/all`);
    const rawEmployers: EmployerFromServer[] = response.data.data;
    return rawEmployers;
}

export async function getEmployerById(id: number) {
    const response = await axios.get(`${serverURL}/employer/${id}`);
    const rawEmployer: EmployerFromServer = response.data;
    return rawEmployer;
}

export async function getAllJobs(page:number = 1) {
    const response = await axios.get(`${serverURL}/job/all?page=${page}`)
    const rawJobs: RecruitmentFromServer[] = response.data.data;
    const totalPages = response.data.total_pages;
    return { allJobs: rawJobs, totalPages: totalPages };
}

export async function getJobsStat(limit: number = 1000) {
    let response = await axios.get(`${serverURL}/job/all?limit=${limit}`)
    const total = response.data.total;
    response = await axios.get(`${serverURL}/job/all?limit=${limit}&status=true`);
    const isActive = response.data.total;
    response = await axios.get(`${serverURL}/job/all?limit=${limit}&status=false`);
    const isNotActive = response.data.total;
    return { total: total, isActive: isActive, isNotActive: isNotActive };
}

export async function getJobByCampaignId(campaignId: number) {
    try {

        const response = await axios.get(`${serverURL}/job?campaignId=${campaignId}`);
        if (response.status != 200) return null;
        const rawJob: RecruitmentFromServer = response.data;
        return rawJob;
    }
    catch (e) {
        return null;
    }
}

export async function getJobById(id: number) {
    const response = await axios.get(`${serverURL}/job/${id}`);
    const rawJob: RecruitmentFromServer = response.data;
    return rawJob;
}

export async function getApplicationsByCampaignId(hrId:number, campaignId: number) {
    // console.log(`${serverURL}/application/hr/${hrId}?page=1&limit=100&campaignId=${campaignId}&status=true`);
    
    const response = await axios.get(`${serverURL}/application/hr/${hrId}?page=1&limit=100&campaignId=${campaignId}`)
    const rawApplications: ApplicationFromServer[] = response.data.applications;
    const total = response.data.total;
    return {total: total, applications: rawApplications}
}

export async function getUserById(userId: number) {
    try {
        const response = await axios.get(`${serverURL}/user/${userId}`);
        const user: UserFromServer = response.data;
        return user;
    }
    catch (e) {
        return null;
    }
}

export async function getAllFields() {
    const response = await axios.get(`${serverURL}/job/field/all`);
    const fields: Field[] = response.data;
    return fields;
}