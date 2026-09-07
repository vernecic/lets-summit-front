<script setup lang="ts">
import type { CardTrip } from "~/types/card";

const { currentUser } = useAuth();

const isUserOwner = computed(() => {
  if (!currentUser.value) return false;
  return currentUser.value._id === trip.value?.ownerId;
});

const isUserInParticipants = computed(() => {
  if (!currentUser.value) return false;
  return trip.value?.participants.some(
    (participant) => participant._id === currentUser.value?._id,
  );
});

const isUserInJoinRequests = computed(() => {
  if (!currentUser.value) return false;
  return trip.value?.joinRequests.some(
    (request) => request._id === currentUser.value?._id,
  );
});

const isTripFull = computed(() => {
  if (!trip.value) return false;
  return trip.value.participants.length >= trip.value.maxParticipants;
});

const config = useRuntimeConfig();
const route = useRoute();
const params = route.params as { id: string };

const deleteTrip = async () => {
  await $fetch(`${config.public.BACKEND_URL}/trips/${params.id}`, {
    method: "DELETE",
    credentials: "include",
  });
  navigateTo("/");
};

const joinTrip = async () => {
  await $fetch(`${config.public.BACKEND_URL}/trips/${params.id}/join`, {
    method: "POST",
    credentials: "include",
  });
  await refresh();
};

const leaveTrip = async () => {
  await $fetch(`${config.public.BACKEND_URL}/trips/${params.id}/leave`, {
    method: "DELETE",
    credentials: "include",
  });
  await refresh();
};

const acceptRequest = async (userId: string) => {
  await $fetch(
    `${config.public.BACKEND_URL}/trips/${params.id}/accept/${userId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  await refresh();
};

const rejectRequest = async (userId: string) => {
  await $fetch(
    `${config.public.BACKEND_URL}/trips/${params.id}/reject/${userId}`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  await refresh();
};

const removeParticipant = async (userId: string) => {
  await $fetch(
    `${config.public.BACKEND_URL}/trips/${params.id}/remove/${userId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  await refresh();
};

const url = `${config.public.BACKEND_URL}/trips/${params.id}`;
const { data: trip, refresh } = await useFetch<CardTrip>(url);

const activeList = ref("participants");

const toggleActiveList = (list: string) => {
  activeList.value = list;
};
</script>

<template>
  <div
    v-if="trip"
    class="py-20 flex flex-col gap-20 max-w-4xl mx-auto px-40 min-h-screen"
  >
    <div class="flex gap-20">
      <div class="flex flex-col gap-6">
        <div class="flex gap-2 items-center">
          <h1 class="text-4xl font-medium">{{ trip.title }}</h1>
          <UBadge class="capitalize" color="error" variant="solid" size="lg">{{
            trip.difficulty
          }}</UBadge>
          <UBadge color="neutral" variant="subtle" size="lg"
            >{{ trip.elevation }} m</UBadge
          >
        </div>
        <p>{{ trip.description }}</p>
      </div>
    </div>
    <div class="flex gap-2">
      <UButton
        v-if="isUserOwner"
        :to="`/trips/${params.id}/edit`"
        color="neutral"
        variant="subtle"
        class="cursor-pointer"
        >Edit Trip</UButton
      >
      <UButton
        @click="deleteTrip"
        v-if="isUserOwner"
        color="error"
        variant="solid"
        class="cursor-pointer"
        >Delete Trip</UButton
      >
      <UButton
        @click="leaveTrip"
        v-else-if="isUserInParticipants"
        color="error"
        variant="solid"
        class="cursor-pointer"
        >Leave Trip</UButton
      >
      <UButton
        v-else-if="isUserInJoinRequests"
        color="warning"
        variant="subtle"
        disabled
        class="cursor-pointer"
        >Pending</UButton
      >
      <UButton
        v-else-if="!currentUser && !isTripFull"
        to="/login"
        color="neutral"
        variant="subtle"
        class="cursor-pointer"
        >Log in to join</UButton
      >
      <UButton
        @click="joinTrip"
        v-else-if="!isTripFull"
        color="primary"
        variant="solid"
        class="cursor-pointer"
        >Join Trip</UButton
      >
    </div>

    <div>
      <div class="flex gap-2">
        <UButton
          @click="toggleActiveList('participants')"
          :color="activeList === 'participants' ? 'primary' : 'neutral'"
          variant="subtle"
          class="cursor-pointer"
          >Participants ({{ trip.participants.length }})</UButton
        >
        <UButton
          v-if="isUserOwner"
          @click="toggleActiveList('joinRequests')"
          :color="activeList === 'joinRequests' ? 'primary' : 'neutral'"
          variant="subtle"
          class="cursor-pointer"
          >Join requests ({{ trip.joinRequests.length }})</UButton
        >
      </div>

      <div v-if="activeList === 'participants'">
        <div class="flex flex-col gap-2 pt-4">
          <div
            v-for="participant in trip.participants"
            :key="participant._id"
            class="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
          >
            <span>{{ participant.username }}</span>
            <UBadge
              v-if="participant._id === trip.ownerId"
              color="primary"
              variant="subtle"
              >Owner</UBadge
            >
            <UButton
              v-else-if="isUserOwner"
              @click="removeParticipant(participant._id)"
              color="error"
              variant="ghost"
              size="sm"
              class="cursor-pointer"
              >Remove</UButton
            >
          </div>
        </div>
      </div>

      <div v-if="activeList === 'joinRequests' && isUserOwner">
        <div class="flex flex-col gap-2 pt-4">
          <p v-if="!trip.joinRequests.length" class="text-sm text-gray-500">
            No join requests
          </p>
          <div
            v-for="request in trip.joinRequests"
            :key="request._id"
            class="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
          >
            <span>{{ request.username }}</span>
            <div class="flex gap-2">
              <UButton
                @click="acceptRequest(request._id)"
                color="success"
                variant="solid"
                size="sm"
                class="cursor-pointer"
                >Accept</UButton
              >
              <UButton
                @click="rejectRequest(request._id)"
                color="error"
                variant="ghost"
                size="sm"
                class="cursor-pointer"
                >Deny</UButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
